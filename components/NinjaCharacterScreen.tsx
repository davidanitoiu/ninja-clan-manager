import { map, capitalize } from "lodash";
import { useRouter } from "next/router";
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
        if (value > 17) {
            return ""
        }
    }

    let i = 0;

    return (
        <section className="w-full h-full bg-gradient-to-br from-theme-black via-theme-black to-primary-dark font-display ">
            <div className="w-full py-8 px-12 text-theme-white text-4xl flex justify-between items-baseline">
                <button onClick={handleBack}>{"<- Back"}</button>
                <h1 className="title-border border-b-primary-dark">{ninja.personal.name}</h1>
                <p>Age: {ninja.personal.age}</p>
            </div>
            <div className="grid grid-rows-6 grid-cols-3 text-theme-white gap-4 px-12 max-w-screen-md">

                {map(ninja.attributes, (attributeValue, key) => {
                    i++
                    return (
                        (
                            <div className={`flex justify-between items-center bg-opacity-5 py-2 px-4 gap-4 ${i % 2 ? 'bg-secondary-light' : 'bg-secondary-dark'}`} key={key}>
                                <p className="w-3/4">{capitalize(key)}</p>
                                <p className={`"w-1/4 text-primary" ${getAttributeColoring(attributeValue)}`}>{attributeValue}</p>
                            </div>
                        )
                    )
                })}
            </div>
        </section>
    )
}

export default NinjaCharacterScreen;
