/**
 * override react-testing-library
 */
import React, { FC, ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeProvider } from '@emotion/react';
import { theme } from '../style/theme';
import '../libs/i18n';

const AllTheProviders: FC = ({ children }) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <ThemeProvider theme={theme}>
          <div id="modal" />
          {children}
        </ThemeProvider>
      </RecoilRoot>
    </QueryClientProvider>
  );
};

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };
