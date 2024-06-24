import { ClientResponse } from '@commercetools/platform-sdk';
import { useQuery } from '@tanstack/react-query';

import { getUserInfo } from '@/api/clientService';
import ErrorAlert from '@/components/errorAlert/ErrorAlert';
import Loader from '@/components/loader/Loader';

import Addresses from './Addresses';
import { Customer } from './Types';
import UserInfo from './UserInfo';

function ProfilePage(): JSX.Element {
  const {
    data: customer,
    isError,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['me'],
    queryFn: getUserInfo,
    select: (data: ClientResponse<Customer>) => data.body,
  });

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    console.error(error);
    return <ErrorAlert />;
  }

  return (
    <>
      <UserInfo {...customer} />
      <Addresses {...customer} />
    </>
  );
}

export default ProfilePage;
