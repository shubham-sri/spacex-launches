export interface LaunchSite {
    site_name_long: string
}

export interface Links {
    wikipedia: string
}

export interface Core {
    reuse_count: 6
    status: string
}

export interface Cores {
    flight: number
    core: Core
}

export interface FirstStage {
    cores: Array<Cores>
}

export interface Payloads {
    payload_type: string
    payload_mass_kg: number
    payload_mass_lbs: number
}

export interface SecondStage {
    payloads: Array<Payloads>
}

export interface Rocket {
    rocket_name: string
    first_stage: FirstStage
    second_stage: SecondStage
}

export interface Ship {
    name: string
    home_port: string
    image: string
}

export interface Launch {
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
    launchesPast: Array<Launch>
}

export interface FindVariables {
    rocket_name?: string
    mission_name?: string
}

export interface LaunchesPastVariables {
    find?: FindVariables,
    limit?: number,
    offset?: number
}

export interface LaunchData {
    launch: Launch
}

export interface LaunchVariables {
    id: string
}
