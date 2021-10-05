import {
    gql
} from "@apollo/client";

const EXCHANGE_RATES = gql`
    query GetLaunchesPast($limit: Int, $offset: Int, $find: LaunchFind) {
        launchesPast(limit: $limit, offset: $offset, find: $find) {
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
