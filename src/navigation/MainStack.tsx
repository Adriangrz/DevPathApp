import React from 'react';

import {LoadingIndicator} from '../components/LoadingIndicator';
import {useAuth} from '../contexts';
import {PrivateStack} from './PrivateStack';
import {PublicStack} from './PublicStack';

export const MainStack = (): JSX.Element => {
  const {email, isLoading} = useAuth();

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return email ? <PrivateStack /> : <PublicStack />;
};
