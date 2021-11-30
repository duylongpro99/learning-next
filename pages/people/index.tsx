import path from "path";
import { promises as fs } from "fs";
import Link from "next/link";

export type People = {
    id: number;
    lastName: string;
    firstName: string;
    age: number;
}

export type ComponentProps = {
    people: People[][];
}

export default function Pepole(props: ComponentProps) {

    return (<div>
        {props && props.people && props.people[0].map((person) => {
            return (
                <div key={person.id}>
                    <Link href={`/person/${person.id}`}>{person.firstName + ' ' + person.lastName}</Link>
                </div>
            );
        })}
    </div>);
}

export async function getStaticProps() {
    const peopleJsonDirectory = path.join(process.cwd(), 'mock');
    const fileNames = await fs.readdir(peopleJsonDirectory);
    const _people = fileNames.map(async (fileName) => {
        const filePath = path.join(peopleJsonDirectory, fileName);
        const fileContents = await fs.readFile(filePath, 'utf-8');
        const people: People[] = [];
        let peopleObjs = JSON.parse(fileContents);
        let peopleNames = Object.keys(JSON.parse(fileContents));
        peopleNames.map((name, i) => {
            people.push({
                firstName: name,
                id: i+1,
                lastName: peopleObjs[name].lastName,
                age: peopleObjs[name].age
            });
        });
        return people; 
    });
    return {
        props: {
            people: await Promise.all(_people)
        }
    }
}