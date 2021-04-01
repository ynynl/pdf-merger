import './style.scss'

import {
    Card,
    StyledBody,
    StyledAction
} from "baseui/card";
import { Button } from "baseui/button";
import { ButtonGroup } from 'baseui/button-group';

const Controller = () => {
    return (
        <Card>
            <StyledBody>
                Total pages:
        </StyledBody>
            <>
                <ButtonGroup>
                    <Button>One</Button>
                    <Button>Two</Button>
                    <Button>Three</Button>
                </ButtonGroup>
            </>
            <Button>Save</Button>
        </Card>
    );
}

export default Controller