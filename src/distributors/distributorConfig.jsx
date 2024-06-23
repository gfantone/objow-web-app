import React from 'react';
import ObjowRoutes from '../Routes';
import SpiderRoutes from '../Spider/Routes';
import {useEdenredTheme} from '../Spider/themes';

export const objow = {
    routes: <ObjowRoutes/>,
}

export const edenred = {
    routes: <SpiderRoutes/>,
    useTheme: useEdenredTheme
}
