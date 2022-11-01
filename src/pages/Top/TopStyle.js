import { createStyles } from '@mantine/core';

export const useStyles = createStyles((theme, _params, getRef) => ({
    table:{
        marginTop: '20px',
    },
    topHeader: {
        background: "#25262B",
        backdropFilter: "blur(14px)",
        maxWidth: 1400,
        height: "47px",
        borderRadius: "10px",
        display: "grid",
        gridTemplateColumns: "0.5fr 1fr 1fr 1fr 1fr 1fr",
        margin: "0 auto",
        padding:"0 20px",
        
    },
    item: {
        display: "flex",
        alignItems: "center",
        height: "100%",
        fontWeight: 500,
        fontSize: "14px",
    },
    topRow:{
        background: "#2C2E33",
        backdropFilter: "blur(14px)",
        maxWidth: 1400,
        height: "47px",
        borderRadius: "10px",
        display: "grid",
        gridTemplateColumns: "0.5fr 1fr 1fr 1fr 1fr 1fr",
        margin: "0 auto",
        padding:"0 20px",
        "&:nth-of-type(1)": {
            marginTop:12,
        },
        marginBottom: 4,
        "&:hover": {
            background: "#2c2e3380",
            backdropFilter: "blur(20px)",
        }
    },
    avatar:{
        marginRight: 8 
    },
    poster:{
        background: "url(./header_new.webp) no-repeat center center",
        height: 200,
        maxWidth: 1400,
        margin: "0 auto",
        marginTop: 12,
        padding: 40,
        fontFamily: "Segoe UI Semibold",
        "@media (max-width: 600px)": {
            height: 320,
            margin: 10,
            width: "auto",
        }
    },
    posterTitle:{
        fontFamily: "Inter",
        color: "#fff",
        fontSize: 28,
        display: "flex",
        alignItems: "center",
        "& img":{
            marginRight: 12
        }
    },
    posterDescription:{
        marginBottom: 20,
    },
    posterBtns:{
        display: "flex",
        "@media (max-width: 600px)": {
            flexWrap: "wrap",
        }
    }

}));