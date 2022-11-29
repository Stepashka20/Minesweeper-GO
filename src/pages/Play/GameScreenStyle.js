import { createStyles } from '@mantine/core';



export const useStyles = createStyles((theme, _params, getRef) => ({
    centered:{
        maxWidth: 1400,
        margin: '0 auto',
        marginTop: 20,
        "@media (max-width: 768px)": {
            padding: '0 20px',
        }
    },
    flexCenter:{
        display: 'flex',
        alignItems: 'center',
    },
    box:{
        // margin:1,
        // width: "calc(100% / 10)",
        aspectRatio: "1/1",
        background:"#1a1b1e",
        border: "1px solid #2a2b2e",
        borderRadius: 4,
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        "&:hover":{
            background:"#1a1b1e2b",
        },
        "@media (max-width: 768px)": {
            width: 40,
        }
    },
    
    table:{
        display: 'flex',
        flexWrap: 'wrap',
        "@media (max-width: 768px)": {
            width: 800,
            height: 500,
        }
    },
    field:{
        "& .mantine-Card-root":{
            padding: 0,
        }
    },
    flag:{
        width: "60%",
    },
    number:{
        fontSize: 40,
    }
}));