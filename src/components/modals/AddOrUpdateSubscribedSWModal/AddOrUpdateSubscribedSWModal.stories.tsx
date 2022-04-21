import React from 'react';
import { action } from '@storybook/addon-actions';
import AddOrUpdateSubscribedSWModal from '.';
import { generateString } from '../../../__mocks__/create-mock';

const closeModalAction = action('close modal');
const onSubmitAction = action('on submit');
const onDeleteAction = action('on delete');

export default {
  title: 'Modal/AddOrUpdateSubscribedSWModal',
  component: AddOrUpdateSubscribedSWModal,
};

const defaultLicense = generateString(8);
const defaultSWName = generateString(8);
const defaultExpireDate = generateString(8);
const defaultLatestUpdatedDate = generateString(8);

export const createModal = () => (
  <AddOrUpdateSubscribedSWModal modalState="create" closeModal={closeModalAction} onSubmit={onSubmitAction} />
);

export const updateModal = () => (
  <AddOrUpdateSubscribedSWModal
    modalState="update"
    defaultLicense={defaultLicense}
    defaultSWName={defaultSWName}
    defaultExpireDate={defaultExpireDate}
    defaultLastestUpdatedDate={defaultLatestUpdatedDate}
    closeModal={closeModalAction}
    onSubmit={onSubmitAction}
    onDelete={onDeleteAction}
  />
);
