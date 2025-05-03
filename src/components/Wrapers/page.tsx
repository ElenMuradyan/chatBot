'use client'

import { store } from "@/state-management/store";
import { Provider } from "react-redux";
import MainLoader from "../LoadingWrapper/page";
import HeaderWrapper from "../HeaderWrapper/page";

export default function Wrappers ({children}: {children: React.ReactNode}) {
    return(
        <Provider store={store}>
        <MainLoader>
          <HeaderWrapper>
            {children}
          </HeaderWrapper>
        </MainLoader>
      </Provider>
    )
}