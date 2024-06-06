import dayjs from 'dayjs';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Welcome {
  customer: Customer;
  deleteUserFromStore: () => void;
  saveUserInStore: (customer: Customer) => void;
}

export interface Customer {
  addresses?: Address[];
  authenticationMode?: string;
  billingAddressIds?: string[];
  createdAt?: Date | string;
  createdBy?: EdBy | undefined;
  dateOfBirth?: Date | dayjs.Dayjs | string;
  defaultBillingAddressId?: string;
  defaultShippingAddressId?: string;
  email?: string;
  firstName?: string;
  id?: string;
  isEmailVerified?: boolean;
  lastMessageSequenceNumber?: number;
  lastModifiedAt?: Date | string;
  lastModifiedBy?: EdBy | undefined;
  lastName?: string;
  password?: string;
  salutation?: string;
  shippingAddressIds?: string[];
  stores?: unknown[];
  title?: string;
  version?: number;
  versionModifiedAt?: Date | string;
}

export interface Address {
  city?: string;
  country?: string;
  id?: string;
  postalCode?: string;
  region?: string;
  streetName?: string;
}

export interface EdBy {
  anonymousId?: string;
  clientId?: string;
  isPlatformClient?: boolean;
}

export const useCustomerStore = create<Welcome>()(
  persist(
    (set) => ({
      customer: {},

      saveUserInStore: (customer: Customer) => {
        set((state) => ({
          ...state,
          customer: {
            ...customer,
          },
        }));
      },

      deleteUserFromStore: () => {
        set((state) => ({
          ...state,
          customer: {},
        }));
      },
    }),
    {
      name: 'green-shop-user',
    },
  ),
);
