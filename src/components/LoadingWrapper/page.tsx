'use client'

import { WrapperTooltipProps } from 'antd/es/form/FormItemLabel';
import { useSelector } from 'react-redux';
import { RootState } from '@/state-management/store';

import '../../styles/home.css';

type MainLoaderProps = WrapperTooltipProps & {
    loading?: boolean;
  };
  
const MainLoader: React.FC<MainLoaderProps> = ({ loading, children }) => {
    const { loading: stateLoading } = useSelector((state: RootState) => state.userData);

  return (
    <>
    {
        (loading || stateLoading) ? <div className="mainLoaderContainer">
        <div className="mainLoader" />
        <h1
          style={{
            background: 'linear-gradient(45deg, rgb(0, 55, 255), rgb(255, 0, 242))',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
            lineHeight: 1.6
          }}
        >
          LOADING...
        </h1>
      </div> : children
    }
    </>
  );
}

export default MainLoader;