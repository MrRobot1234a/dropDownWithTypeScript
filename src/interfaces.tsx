export interface structureCountry {
    flags: {
        png: string,
        svg: string,
        alt: string
    },
    name: {
        common: string,
        official: string,
        nativeName: {
            [key: string]: {
                official: string,
                common: string
            }
        }
    },
    idd: {
        root: string,
        suffixes: string[]
    },
    capital: string[],
    region: string,
    flag: string,
    maps: {
        googleMaps: string,
        openStreetMaps: string
    }
}

export interface selected {
    name: string,
    googleMap: string 
}
