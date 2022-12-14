import * as React from 'react';
import { platformSpecificSpaceUnits } from './utils';

type Config = any;

export const defaultConfig: { config: Config } = {
  config: {},
};

// interface ConfigContextData {
//   config: Config;
//   setConfig: (config: Config) => void;
// }

const defaultContextData: Config = defaultConfig;

const StyledContext = React.createContext<Config>(defaultContextData);

export const StyledProvider: React.FC<{
  config: Config;
  children?: React.ReactNode;
}> = ({ config, children }) => {
  const currentConfig = React.useMemo(() => {
    return platformSpecificSpaceUnits(config);
  }, [config]);

  return (
    <StyledContext.Provider value={{ config: currentConfig }}>
      {children}
    </StyledContext.Provider>
  );
};

export const useStyled = () => React.useContext(StyledContext);
