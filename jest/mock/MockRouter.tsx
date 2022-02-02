import React, { FC } from 'react';
import { BrowserRouter } from 'react-router-dom';

const MockRouter: FC = ({ children }) => <BrowserRouter>{children}</BrowserRouter>;

export default MockRouter;
