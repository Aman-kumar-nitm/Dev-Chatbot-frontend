import React, { Suspense } from 'react';

const AppLayout = React.lazy(() => import('../../components/layout/Applayout'));

const ChatPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AppLayout />
    </Suspense>
  );
};
export default ChatPage;