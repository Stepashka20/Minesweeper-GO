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
    userAvatarUploadCard:{
        maxWidth: 250,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        "@media (max-width: 768px)": {
            maxWidth: 1400,
        }
    },
    textWithImage:{
        display: 'flex',
        alignItems: 'center',
    },
    container:{
        display: 'flex',
        alignItems: 'flex-start',
        "@media (max-width: 768px)": {
            flexDirection: 'column',
            alignItems: "stretch"
        }
    },
    userInfo:{
        marginLeft: 20,
        width: "calc(100% - 280px)",
        "@media (max-width: 768px)": {
            marginLeft: 0,
            width: "auto",
            marginTop: 20
        }
    }
    
}));