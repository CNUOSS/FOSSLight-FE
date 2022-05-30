import { GetLicenseListResponseClientType, LicenseType } from '@@types/client';
import { generateString } from './create-mock';

/**
 * data mock
 */
export const generateLicenseMock = (): LicenseType => ({
  id: Math.ceil(Math.random() * 100),
  licenseName: generateString(5),
  licenseType: generateString(7),
  licenseUrl: generateString(15),
  restrictions: [generateString(6), generateString(6), generateString(6)],
});

/**
 * response mock
 */
export const generateGetLicensesResponseMock = (): GetLicenseListResponseClientType => ({
  pageInfo: {
    totalElements: 10,
    last: false,
    totalPages: 10,
    size: 10,
  },
  licenses: [generateLicenseMock(), generateLicenseMock(), generateLicenseMock()],
});

export const generateCreateLicenseResponseMock = (): LicenseType => generateLicenseMock();
