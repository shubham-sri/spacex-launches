import React, {CSSProperties, useEffect, useMemo, useState} from "react";
import {Paper, Skeleton} from "@mui/material";
import {styled} from "@mui/material/styles";
import {Launch, LaunchData, LaunchVariables} from "../../types";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import {useLazyQuery} from "@apollo/client";
import {GetLaunch} from "../../gql/query";
import {useEffectOnce} from "react-use";
import { useParams } from "react-router-dom";
import {toast} from "react-toastify";
import {AppTopBar} from "../../components/header";

import './index.css'

interface Column {
    id: string;
    label: string;
    minWidth?: number;
    align?: 'right' | 'center';
    format?: (value: any) => string;
    reduce?: (value: any[]) => number;
    style?: (value: any) => CSSProperties;
}

const columns: readonly Column[] = [
    {
        id: 'filed',
        label: 'Field',
        minWidth: 20
    },
    {
        id: 'item_1',
        label: 'Item 1',
        minWidth: 70
    },
    {
        id: 'item_2',
        label: 'Item 2',
        minWidth: 70
    },
];

const TableWrapper = styled('div')(({ theme }) => ({
    position: 'relative',
    maxWidth: '120ch',
    margin: '10px auto'
}));


export const CompareScreen: React.FC = () => {


    const [dataA, setDataA] = useState<Launch | undefined>(undefined)
    const [dataB, setDataB] = useState<Launch | undefined>(undefined)

    let { idA, idB } = useParams<{idA: string, idB: string}>();

    const [getData, {loading, data, error}] = useLazyQuery<LaunchData, LaunchVariables>(GetLaunch)

    useEffectOnce(() => {
        getData({
            variables: {
            id: idA
        }})
    })

    useEffect(()=>{
        if(!loading) {
            if(dataA && data){
                setDataB(data.launch)
            }
            if(!dataA && data) {
                setDataA(data.launch)
                getData({
                    variables: {
                        id: idB
                    }
                })
            }
        }
    }, [data, dataA, getData, idB, loading])

    useEffect(()=>{
        if(error){
            toast.error('Something went wrong!')
        }
    }, [error])


    const rows: Record<string, any>[] = useMemo(()=>{
        if(dataA && dataB){
            return [
                {
                    'filed': 'ID',
                    'item_1': dataA.id,
                    'item_2': dataB.id,
                },
                {
                    'filed': 'Mission Name',
                    'item_1': dataA.mission_name,
                    'item_2': dataB.mission_name,
                },
                {
                    'filed': 'Launch Status',
                    'item_1': dataA.launch_success ? 'SUCCESS' : 'FAILED',
                    'item_2': dataB.launch_success ? 'SUCCESS' : 'FAILED',
                },
                {
                    'filed': 'Rocket Name',
                    'item_1': dataA.rocket.rocket_name,
                    'item_2': dataB.rocket.rocket_name,
                },
                {
                    'filed': 'Total Payload Mass(in Kg)',
                    'item_1': dataA.rocket.second_stage.payloads.reduce((acc, item) => acc+item.payload_mass_kg, 0),
                    'item_2': dataB.rocket.second_stage.payloads.reduce((acc, item) => acc+item.payload_mass_kg, 0),
                },
                {
                    'filed': 'Total Ships',
                    'item_1': dataA.ships.length,
                    'item_2': dataB.ships.length,
                },
                {
                    'filed': 'Total Cores',
                    'item_1': dataA.rocket.first_stage.cores.length,
                    'item_2': dataB.rocket.first_stage.cores.length,
                },
            ]
        }
        return []
    }, [dataA, dataB])

    return (
        <div className="compare-container">
            <div className="home-header">
                <AppTopBar/>
                <TableWrapper>
                    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                        <TableContainer sx={{ height: '50ch' }}>
                            <Table stickyHeader aria-label="sticky table" >
                                <TableHead>
                                    <TableRow>
                                        {columns.map((column) => (
                                            <TableCell
                                                key={column.id}
                                                align={column.align}
                                                style={{ minWidth: column.minWidth }}
                                            >
                                                {column.label}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody className={'table-body'}>
                                    {rows
                                        .map((row, rIndex) => {
                                            return (
                                            <TableRow key={rIndex} className={'data-compare'}>
                                                {columns.map((column) => {
                                                    const data = row[column.id]

                                                    const format = column.format ? column.format(data) : data

                                                    return <TableCell padding="checkbox"
                                                                      key={column.id}
                                                                      align={column.align}
                                                                      style={{
                                                                          padding: '20px'
                                                                      }}
                                                                      className={column.id === 'id' ? `row-id` : 'data-cell'}
                                                    >
                                                        <div>
                                                            {format}
                                                        </div>
                                                    </TableCell>
                                                })}
                                            </TableRow>
                                            );
                                        })}
                                    { loading ? <>
                                            {Array.from(Array(7)).map((_, index) => {
                                                return (
                                                    <TableRow key={index}>
                                                        <TableCell colSpan={columns.length}>
                                                            <Skeleton animation={'wave'} style={{width: '100%', height: '30px'}}/>
                                                        </TableCell>
                                                    </TableRow>
                                                )
                                            })}
                                        </>
                                        : <></>
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </TableWrapper>
            </div>
        </div>
    )
}
