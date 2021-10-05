interface LaunchSite {
    site_name_long: string
}

interface Links {
    wikipedia: string
}

interface Core {
    reuse_count: 6
    status: string
}

interface Cores {
    flight: number
    core: Core
}

interface FirstStage {
    cores: Array<Cores>
}

interface Payloads {
    payload_type: string
    payload_mass_kg: number
    payload_mass_lbs: number
}

interface SecondStage {
    payloads: Array<Payloads>
}

interface Rocket {
    rocket_name: string
    first_stage: FirstStage
    second_stage: SecondStage
}

interface Ship {
    name: string
    home_port: string
    image: string
}

interface Launch {
    id: string
    mission_name: string
    launch_date_local: string
    launch_site: LaunchSite
    launch_success: boolean
    links: Links
    rocket: Rocket
    ships: Array<Ship>
}

export interface LaunchesPastData {
    launchesPast: []
}

interface FindVariables {
    rocket_name?: string
    mission_name?: string
}

export interface LaunchesPastVariables {
    find?: FindVariables,
    limit?: number,
    offset?: number
}
