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
    priceBadge:{
        display: 'flex',
        alignItems: 'center',
    },
    card:{
        width: 260,
    },
    topCard:{
        gap: 4
    },
    sectionTitle:{
        marginBottom: 20,
    },
    products:{
        display: 'flex',
        justifyContent: "center",
        marginBottom: 20,
    }
}));