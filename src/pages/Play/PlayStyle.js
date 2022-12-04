import { createStyles } from '@mantine/core';



export const useStyles = createStyles((theme, _params, getRef) => ({
    centered:{
        "@media (min-width: 500px)":{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            color: "#fff",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
        },
        fontFamily: "Segoe UI Semibold",
    },
    settingsRow:{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 8,
        "& .mantine-SegmentedControl-root":{
            marginLeft: 12
        }
    },
    segmented:{
        marginBottom: 40,
        "@media (max-width: 500px)":{
            marginBottom: 10,
            marginTop: 10
        }
    },
    card: {
        backgroundColor: theme.colors.dark[6],
        padding: theme.spacing.xl,
        borderRadius: theme.radius.md,
        "@media (min-width: 500px)":{
            minWidth: 460,
        }
    },
    personInfo:{
        display: "flex",
        alignItems: "center",
    },
    lobbyRowInfo:{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
    },
    avatar:{
        marginRight: 16,
    },
    enterGameBtn:{
        marginLeft: 16,
    },
    startGameRow:{
        display: "flex",
        alignItems: "center",

        "& svg":{
            marginLeft: 16,
            cursor: "pointer",
        }
    },
    lobbyLoader:{
        display: "flex",
        justifyContent: "center",
        margin: "50px 0"
    }
}));