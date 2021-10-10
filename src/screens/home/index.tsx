import React, {useEffect, useState} from "react";
import {useLazyQuery} from "@apollo/client";
import {useEffectOnce} from "react-use";
import {toast} from "react-toastify";

import {
    Launch,
    LaunchesPastData,
    LaunchesPastVariables
} from "../../types";
import {GetLaunchesPastQuery} from "../../gql/query";

import './index.css'
import {AppTopBar} from "../../components/header";
import { DataTables } from "../../components/table";
import {styled} from "@mui/material/styles";
import Button from "@mui/material/Button";
import { useHistory } from 'react-router-dom';



const TableWrapper = styled('div')(({ theme }) => ({
    position: 'relative',
    maxWidth: '120ch',
    margin: '10px auto'
}));

export const HomeScreen: React.FC = () => {

    const limit = 100

    const [status, setStatus] = useState(true)

    const [stopScroll, setStopScroll] = useState(false)

    const [offset, setOffset] = useState(0)

    const [data, setData] = useState<Array<Launch>>([])

    const [search, setSearch] = useState('')

    const [slected, setSelcted] = useState<Array<string>>([])

    const onSearch = (value: string) => {
        setSearch(value)
    }

    const filter = (rows: Array<Launch>): Array<Launch> => {
        return rows.filter((item) => {
            return search === ''
                || item.mission_name.toLowerCase().includes(search.toLowerCase())
                || item.rocket.rocket_name.toLowerCase().includes(search.toLowerCase())
        })
    }


    const [getData, {error, loading, data: queryData}] =
        useLazyQuery<LaunchesPastData, LaunchesPastVariables>(
            GetLaunchesPastQuery,
            {fetchPolicy: "network-only"}
        )

    const reFetchData = async () => {
        if(!loading) {
            console.log('ReFetch', limit, offset)
            setStatus(false)
            setStopScroll(true)
            await getData({
                variables: {
                    limit,
                    offset
                },
            })
        }
    }

    useEffectOnce(() => {
        setStatus(false)
        getData({
            variables: {
                limit,
                offset
            }
        })
    })

    useEffect(()=> {
        if(!status && !loading && !error && queryData?.launchesPast){
            setStatus(true)
            if(queryData.launchesPast.length <= 0) {
                setStopScroll(true)
                toast.warn('No more data found!')
            } else {
                setStopScroll(false)
                toast.success('Get data successful!')
            }
            const newData = [...data, ...queryData.launchesPast]
            console.log(newData.length, data.length, queryData.launchesPast.length)
            console.log(queryData.launchesPast)
            console.log(data)

            setData(newData)
            setOffset(newData.length)

        } else if(!loading && error) {
            toast.error('Something went wrong!')
        }
    }, [loading, queryData, error, data, status, offset])


    const onCompareSelect = (id: string, checked: boolean) => {
        if(checked){
            if(!slected.includes(id)) {
                setSelcted([...slected, id])
            }
        } else {
            setSelcted(
                slected.filter((value) => {
                    return value !== id
                })
            )
        }
    }

    const navigation = useHistory()

    const onCompare  = () => {
        if(slected.length >= 2) {
            navigation.push(`/compare/a/${slected[0]}/b/${slected[1]}`)
        }
    }


    return (
        <div className="home-container">
            <div className="home-header">
                <AppTopBar onSearch={onSearch}/>
                <TableWrapper>
                    <DataTables
                        rows={filter(data)}
                        loading={loading}
                        reFetch={reFetchData}
                        stopReFetch={stopScroll}
                        selected={slected}
                        onCompareSelect={onCompareSelect}
                    />
                    {slected.length >= 2
                        ? <div style={{
                            width: '100%',
                            display: 'flex',
                            marginTop: '40px',
                            justifyContent: 'center',
                        }}>
                            <Button
                                style={{
                                width: '70%',
                                }}
                                variant="outlined"
                                onClick={onCompare}
                                id={'compare-button'}
                            >
                                Compare
                            </Button>
                        </div>
                        : <></>}
                </TableWrapper>
            </div>
        </div>
    )
}
