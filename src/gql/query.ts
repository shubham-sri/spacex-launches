import {gql} from "@apollo/client";

export const GetLaunchesPastQuery = gql`
    query GetLaunchesPast($limit: Int, $offset: Int, $find: LaunchFind) {
        launchesPast(limit: $limit, offset: $offset, find: $find) {
            id
            mission_name
            launch_date_local
            launch_site {
                site_name_long
            }
            launch_success
            links {
                wikipedia
            }
            rocket {
                rocket_name
                first_stage {
                    cores {
                        flight
                        core {
                            reuse_count
                            status
                        }
                    }
                }
                second_stage {
                    payloads {
                        payload_type
                        payload_mass_kg
                    }
                }
                rocket_type
            }
            ships {
                name
                home_port
                image
            }
        }
    }
`;

export const GetLaunch = gql`
    query GetLaunche($id: ID!) {
        launch(id: $id) {
            id
            mission_name
            launch_date_local
            launch_site {
                site_name_long
            }
            launch_success
            links {
                wikipedia
            }
            rocket {
                rocket_name
                first_stage {
                    cores {
                        flight
                        core {
                            reuse_count
                            status
                        }
                    }
                }
                second_stage {
                    payloads {
                        payload_type
                        payload_mass_kg
                    }
                }
                rocket_type
            }
            ships {
                name
                home_port
                image
            }
        }
    }
`
