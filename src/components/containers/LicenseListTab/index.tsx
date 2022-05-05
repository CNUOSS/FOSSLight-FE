// Dependencies
import React, { useState } from 'react';
import TabTemplate from '../../templates/TabTemplate';
import AsyncBoundary from '../../../libs/AsyncBoundary';
import * as Style from './styled';
import { getRestrictionsAPI, getLicenseTypesAPI } from '../../../apis/data';

// Widgets
import Table from './Table';
import Input from '../../widgets/Input';
import TabForm from '../../widgets/TabForm';

// Modals
import AddLicenseModal from '../../modals/AddLicenseModal';
import DeleteModal from '../../modals/DeleteModal';
import Error from '../../widgets/Error';
import DropdownContainer from '../DropdownContainer';

type ModalType = 'add' | 'delete' | 'none';

function LicenseListTab() {
  const [modalState, setModalState] = useState<ModalType>('none');
  const [infoStore, setInfoStore] = useState({});
  const [searchInfo, setSearchInfo] = useState({
    licenseName: '',
    licenseType: '',
    restriction: '',
  });

  const closeModal = () => setModalState('none');
  const openAddLicenseModal = () => setModalState('add');
  const openDeleteModal = () => setModalState('delete');

  const selectRestriction = (restriction: string) => setSearchInfo((info) => ({ ...info, restriction }));
  const selectLicenseType = (licenseType: string) => setSearchInfo((info) => ({ ...info, licenseType }));
  const changeLicenseName = (event: React.ChangeEvent<HTMLInputElement>) =>
    setSearchInfo((info) => ({ ...info, licenseName: event.target.value }));

  const handleSearch = () => setInfoStore(searchInfo);

  return (
    <>
      {modalState === 'add' && <AddLicenseModal closeModal={closeModal} onCreate={() => {}} />}
      {modalState === 'delete' && <DeleteModal closeModal={closeModal} onDelete={() => {}} />}
      <TabTemplate description="Description" onCreate={openAddLicenseModal}>
        <TabForm buttonText="조회하기" onSubmit={handleSearch}>
          <Style.InputWrapper>
            <Input label="라이선스명" value={searchInfo.licenseName} onChange={changeLicenseName} />
            {/* FIXME: Insert asyncboundary inside */}
            <AsyncBoundary pendingFallback={<>loading</>} rejectedFallback={Error}>
              <DropdownContainer
                label="타입"
                width="15rem"
                getUrl={getRestrictionsAPI}
                onClickItem={selectLicenseType}
              />
              <DropdownContainer
                label="규제"
                width="25rem"
                getUrl={getLicenseTypesAPI}
                onClickItem={selectRestriction}
              />
            </AsyncBoundary>
          </Style.InputWrapper>
        </TabForm>
        <AsyncBoundary pendingFallback={<>loading</>} rejectedFallback={Error}>
          <Style.TableWrapper>
            <Table searchInfo={infoStore} openDeleteModal={openDeleteModal} />
          </Style.TableWrapper>
        </AsyncBoundary>
      </TabTemplate>
    </>
  );
}

export default LicenseListTab;