import React from 'react';
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';
import * as Style from './styled';
import Dropdown from '../../widgets/Dropdown';
import logoImage from '../../../assets/images/logo.jpg';
import { LANGUAGES } from '../../../common/constants';
import SigninForm from './SigninForm';
import UserInfo from './UserInfo';

interface SidebarProps {
  isLogin: boolean;
  addNewTab: (name: string, component: React.ReactElement) => void;
}

function Sidebar({ isLogin, addNewTab }: SidebarProps) {
  const { t } = useTranslation();
  const languageNames = LANGUAGES.map((l) => l.name);

  const changeLanguage = (selectedIdx: number) => {
    i18n.changeLanguage(LANGUAGES[selectedIdx].lang);
  };

  return (
    <Style.Container>
      <Style.Top isLogin={isLogin}>
        <Style.Logo src={logoImage} alt="logo" />
        <Style.Title>{t('page:title')}</Style.Title>
        <Style.Version>v1.0.0</Style.Version>
        <Dropdown items={languageNames} onClickItem={changeLanguage} />
      </Style.Top>
      <Style.AuthBox>{isLogin ? <UserInfo /> : <SigninForm />}</Style.AuthBox>
      {isLogin && (
        <Style.MenuList>
          <Style.MenuItem onClick={() => addNewTab('li', <></>)}>{t('page:licenseList')}</Style.MenuItem>
          <Style.MenuItem onClick={() => addNewTab('sw', <></>)}>{t('page:softwareList')}</Style.MenuItem>
          <Style.MenuItem onClick={() => addNewTab('pj', <></>)}>{t('page:projectList')}</Style.MenuItem>
          <Style.MenuItem onClick={() => addNewTab('gp', <></>)}>{t('page:groupList')}</Style.MenuItem>
        </Style.MenuList>
      )}
    </Style.Container>
  );
}

export default Sidebar;
