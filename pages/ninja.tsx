import NinjaAttributeScreen from "components/NinjaCharacterScreen";
import NinjaRosterScreen from "components/NinjaRosterScreen";
import { find } from "lodash";
import { GetServerSideProps } from "next/types";
import { Key, useEffect, useMemo, useState } from "react";
import type { Ninja } from "utils/types/character";

interface NinjaProps {
    id: Key
}

function Ninja({ id }: NinjaProps) {
    const [ninjaRosterList, setNinjaRosterList] = useState<Ninja[]>([]);

    useEffect(() => {
        const ninjaRoster = window.localStorage.getItem('ninjaRoster') ?? '[]';
        setNinjaRosterList(JSON.parse(ninjaRoster));
    }, [])

    const ninja = useMemo(() => find(ninjaRosterList, { id }) as Ninja, [ninjaRosterList, id]);

    return (
        ninja
            ? <NinjaAttributeScreen ninja={ninja} />
            : <NinjaRosterScreen list={ninjaRosterList} />
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { id } = context.query

    return {
        props: {
            id: id ?? null
        }
    }
}

export default Ninja;

