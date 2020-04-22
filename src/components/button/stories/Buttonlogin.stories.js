import React from 'react';
import { storiesOf } from "@storybook/react";
import Buttonlogin from '../Buttonlogin';


storiesOf("Button | About Project", module).add("Default", () => (
    <React.Fragment>
        Click me!
        <Buttonlogin
            textButton={'Ingreso'}
            procesando={false}
        />
    </React.Fragment>
));