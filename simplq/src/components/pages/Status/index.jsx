import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGetToken } from 'store/asyncActions';
import { selectToken } from 'store/token';
import styles from './status.module.scss';
import HeaderSection from '../../common/HeaderSection';
import StatusContainer from './StatusContainer';
import LoadingIndicator from '../../common/LoadingIndicator';
import StatusSidePanel from './StatusSidePanel';
import TokenNumber from './TokenNumber';

// TODO Rename component to token status, component and folder/page name
function QueueStatus(props) {
  const tokenId = props.match.params.tokenId;
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  // const token = {}
  const getToken = useGetToken();
  const deleteToken = useGetToken();

  useEffect(() => {
    dispatch(getToken({ tokenId }));
  }, [tokenId, dispatch, getToken]);

  const onDeleteClick = () => {
    dispatch(deleteToken(tokenId));
  };

  if (token === undefined || Object.keys(token).length === 0) {
    // TODO
    return <LoadingIndicator />;
  }

  return (
    <>
      <HeaderSection queueName={token.queueName} />
      <div className={styles['main-body']}>
        {/* should we be getting token direclty from the store from TokenNumber and StatusContainer, or is passing down info like this fine? */}
        <TokenNumber tokenNumber={token.tokenNumber} />
        <StatusContainer token={token} />
        <StatusSidePanel leaveQueueHandler={onDeleteClick} queueId={token.queueId} />
      </div>
    </>
  );
}

export default QueueStatus;
