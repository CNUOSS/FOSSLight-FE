import {
  CreateRegistrationSWRequestBodyClientType,
  GetRegistrationSWListRequstParamsClientType,
  GetRegistrationSWListResponseClientType,
} from '@@types/client';
import {
  CreateRegistrationSWRequestBodyServerType,
  GetRegistrationSWListResponseServerType,
  GetRegistrationswListRequestParamsServerType,
} from '@@types/server';

export const createRegistrationSWRequestClient2Server = ({
  latestUpdatorId,
  swManufacturer,
  swName,
  managed,
}: CreateRegistrationSWRequestBodyClientType): CreateRegistrationSWRequestBodyServerType => {
  return { managed, latest_updator_id: latestUpdatorId, sw_manufacturer: swManufacturer, sw_name: swName };
};

export const getRegistrationSWRequestClient2Server = ({
  size,
  page,
  sort,
  swMfr,
  swName,
}: GetRegistrationSWListRequstParamsClientType): GetRegistrationswListRequestParamsServerType => {
  return {
    size,
    page: page - 1,
    sort: sort || null,
    'sw-mfr': swMfr || null,
    'sw-name': swName || null,
  };
};

export const getRegistrationSWResponseServer2Client = ({
  page_info,
  registration_sw,
}: GetRegistrationSWListResponseServerType): GetRegistrationSWListResponseClientType => {
  return {
    pageInfo: {
      totalElements: page_info.total_elements,
      last: page_info.last,
      totalPages: page_info.total_pages,
      size: page_info.size,
    },
    registrationSWList: registration_sw.map((sw) => ({
      id: sw.id,
      swManufacturer: sw.sw_manufacturer,
      swName: sw.sw_name,
      latestUpdatorId: sw.latest_updator_id,
      latestUpdateDate: new Date(sw.latest_update_date).toLocaleDateString(),
      managed: sw.managed,
    })),
  };
};