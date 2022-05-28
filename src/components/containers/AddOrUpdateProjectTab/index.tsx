import React from 'react';
import { useSetRecoilState } from 'recoil';
import { useQueryClient } from 'react-query';
import { useAuth } from '@libs/auth';

// Components
import TabTemplate from '@components/templates/TabTemplate';
import DefaultText from '@components/widgets/DefaultText';
import Button from '@components/widgets/Button';
import Input from '@components/widgets/Input';
import ProjectDetailTab from '../ProjectDetailTab';
import DropdownContainer from '../DropdownContainer';

// APIs
import { createProjectAPI, getProjectListAPI } from '@apis/project';
import { getCategoryNamesAPI, getLicenseNamesAPI } from '@apis/data';
import { createProjectRequestClient2Server, createProjectResponseServer2Client } from '@converter/project';
import { getCategoryNamesResponseServer2Client, getLicenseNamesResponseServer2Client } from '@converter/data';

// Hooks
import useForm from '@hooks/useForm';
import useMutation from '@hooks/useMutation';

import { tabState } from '@recoil/tab';
import { compareTabs, deleteTabs } from '@utils/manage-tabs';
import {
  CreateProjectRequestClientType,
  CreateProjectResponseClientType,
  LicenseNamesType,
  ProjectMetaType,
} from '@@types/client';
import * as Style from './styled';

interface AddOrUpdateProjectTabProps {
  projectMeta?: ProjectMetaType;
}

type FormType = Omit<CreateProjectRequestClientType, 'userId'>;

function AddOrUpdateProjectTab({ projectMeta }: AddOrUpdateProjectTabProps) {
  const queryClient = useQueryClient();
  const setTabState = useSetRecoilState(tabState);
  const createMutationSuccess = async (data: CreateProjectResponseClientType) => {
    await queryClient.invalidateQueries(getProjectListAPI);
    setTabState((prev) => {
      const newTabs = compareTabs(prev, `${data.id} . ${data.projectName}`, <ProjectDetailTab projectId={data.id} />);
      return deleteTabs(newTabs, '프로젝트 등록');
    });
  };
  const { mutate } = useMutation({
    url: createProjectAPI.url,
    method: createProjectAPI.method,
    onSuccess: createMutationSuccess,
    converter: {
      request: createProjectRequestClient2Server,
      response: createProjectResponseServer2Client,
    },
  });
  const { change, getValue, handleSubmit, error } = useForm<FormType>({
    projectName: [{ error: 'required' }],
    projectCategoryName: [{ error: 'required' }],
    ossLicenseId: [{ error: 'required' }],
  });
  const { user } = useAuth();

  const DESCRIPTION = projectMeta ? '해당 프로젝트를 수정하세요' : '새로운 프로젝트를 생성하세요';
  const selectCategory = (category: string) => change('projectCategoryName')(category);
  const selectLicense = (license: LicenseNamesType) => change('ossLicenseId')(String(license.id));

  const createProject = (data: FormType) => mutate({ ...data, userId: user?.id });

  if (!user) return <></>;
  return (
    <TabTemplate description={DESCRIPTION}>
      <Style.BackGroundBox>
        <Style.InputWrapper>
          <Input label="프로젝트명" value={getValue('projectName')} onChange={change('projectName')} width="21rem" />
          <DefaultText label="소유자">{user.id}</DefaultText>
          <DropdownContainer
            label="카테고리"
            getUrl={getCategoryNamesAPI}
            responseConverter={getCategoryNamesResponseServer2Client}
            onClickItem={selectCategory}
          />
          {/* FIXME: SearchDropdown */}
          <DropdownContainer
            label="라이선스"
            getUrl={getLicenseNamesAPI}
            itemKey="licenseName"
            responseConverter={getLicenseNamesResponseServer2Client}
            onClickItem={selectLicense}
          />
        </Style.InputWrapper>
        <Style.DescriptionWrapper>
          <Style.Label>설명(선택사항)</Style.Label>
          <Style.DescriptionInput value={getValue('projectDescription')} onChange={change('projectDescription')} />
        </Style.DescriptionWrapper>
        {error && <Style.Error>필수 항목을 모두 입력해주시기 바랍니다</Style.Error>}
        <Style.ButtonWrapper>
          {projectMeta && <Button theme="warning">삭제하기</Button>}
          <Button onClick={handleSubmit(createProject)}>{projectMeta ? '수정하기' : '생성하기'}</Button>
        </Style.ButtonWrapper>
      </Style.BackGroundBox>
    </TabTemplate>
  );
}

export default AddOrUpdateProjectTab;
