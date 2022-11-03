import { createStyles } from '@mantine/core';

export const useStyles = createStyles((theme, _params, getRef) => ({
    root:{
        maxWidth: 1400,
        margin: '0 auto',
        marginTop: 20,
        "@media (max-width: 768px)": {
            padding: '0 20px',
        }
    },
    
}));