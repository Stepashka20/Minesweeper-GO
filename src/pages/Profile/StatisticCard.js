import {Text,Card,Table,Image  } from '@mantine/core';
import { createStyles } from '@mantine/core';


const useStyles = createStyles((theme, _params, getRef) => ({
    label:{
        "& th":{
            background: "#1A1B1E",
            padding: "7px 14px",
            borderRadius: "4px",
            margin: 8,
        }
       
    },
    difficultyColumn:{
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    
    table:{
        width: "100%",
        borderRadius: 8,
        textAlign: 'center',
    }
    
}));


export function StatisticCard({totalLabel,difficulty,img}) {
    const { classes } = useStyles();
    
    return ( 
        <div style={{margin:"20px auto",width:"90%"}}>
           <Card shadow="sm" p="lg" radius="md" withBorder>
                <Card.Section>
                    <Image
                        src={img}
                        height={100}
                        fit='cover'
                    />
                </Card.Section>
                <Table  className={classes.table}>
                    <thead>
                        <tr>
                            <th style={{textAlign:"center"}} colSpan={3}>
                                <Text color="lime" weight="light">{totalLabel}</Text>
                            </th>
                        </tr>
                        <tr>
                            <th style={{textAlign:"center"}}>{difficulty[0].label}</th>
                            <th style={{textAlign:"center"}}>{difficulty[1].label}</th>
                            <th style={{textAlign:"center"}}>{difficulty[2].label}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{difficulty[0].time}</td>
                            <td>{difficulty[1].time}</td>
                            <td>{difficulty[2].time}</td>
                        </tr>
                    </tbody>
                </Table>
            </Card>
            
           
        </div>
    )
}