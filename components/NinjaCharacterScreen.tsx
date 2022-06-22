import { capitalize, map } from "lodash";
import { useRouter } from "next/router";
import { ReactElement } from "react";
import { GiArmorPunch, GiBiceps, GiBrain, GiNinjaHead } from "react-icons/gi";
import type { Ninja } from "utils/types/character";

interface NinjaCharacterScreenProps {
    ninja: Ninja
}

function NinjaCharacterScreen({ ninja }: NinjaCharacterScreenProps) {
    const router = useRouter();
    const handleBack = () => {
        router.push('/ninja');
    }

    const getAttributeColoring = (value: number) => {
        const hue = 125;

        return `hsl(${hue - ((20 - value) * 7)},83%,46%)`
    }

    interface CategoryIconType {
        [key: string]: ReactElement<any, any>
    }
    const categoryIcon: CategoryIconType = {
        physical: <GiBiceps />,
        combat: <GiArmorPunch />,
        subterfuge: <GiNinjaHead />,
        mental: <GiBrain />
    }

    return (
        <main className="w-full h-full bg-gradient-to-br from-theme-black via-theme-black to-primary-dark font-display ">
            <section className="w-full py-8 px-12 text-theme-white text-4xl flex justify-between items-baseline">
                <button onClick={handleBack}>{"<- Back"}</button>
                <h1 className="title-border border-b-primary-dark">{ninja.personal.name}</h1>
                <p>Age: {ninja.personal.age}</p>
            </section>
            <section className="grid grid-cols-2 text-theme-white gap-4 max-w-screen-md">

                {map(ninja.attributes, (attributeCategory, attributeCategoryKey) => (
                    <div>
                        <div id={attributeCategoryKey} className="pl-8 pr-24 py-2 text-lg flex items-center justify-between title-background">
                            <p>{attributeCategoryKey}</p>
                            <p className="text-2xl">{categoryIcon[attributeCategoryKey]}</p>
                        </div>
                        {map(attributeCategory, (attributeValue, attributeKey) => (
                            <div className={`flex justify-between items-center bg-opacity-5 py-2 pl-8 pr-24 gap-4 `} key={attributeKey}>
                                <p>{capitalize(attributeKey)}</p>
                                <p className={`attribute-background`} style={{ color: getAttributeColoring(attributeValue) }}>{attributeValue}</p>
                            </div>
                        ))}
                    </div>
                ))}
            </section>
        </main>
    )
}

export default NinjaCharacterScreen;
