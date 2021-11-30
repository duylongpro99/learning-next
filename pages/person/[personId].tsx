import path from "path";
import { promises as fs } from "fs";
import { ComponentProps, People } from "../people";
import { useEffect, useState } from "react";
import { useRouter } from "next/dist/client/router";
import styles from './person.module.css';
import variables from '../../styles/_ variables.module.scss';

export default function Person (props: ComponentProps) {
    const  [person, setPersion] = useState<People | null>();
    const router = useRouter();
    useEffect(() => {
        const people = props.people[0]; 
        if (props.people[0].length && router.query.personId) {
            const person = people.find((p: People) => p.id === Number(router.query.personId));
            setPersion(person);
        }
    }, [person]);
    return (        
        <div>
            <h2 style={{color: variables.primaryColor}}>{person?.firstName}</h2>
            <h2>{person?.lastName}</h2>
            <h2 className={styles.age}>{person?.age}</h2>
            <h2>Hello</h2>
        </div>
    );
}

async function getPeoleFromDirectory() {
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
    return await Promise.all(_people);
}

export async function getStaticPaths() {
    const people = await getPeoleFromDirectory();
    const personIds = people[0].map((person) => {
        return {
            params: {
                personId: person.id.toString()
            }
        }
    })
    return {
        paths: [...personIds],
        fallback: false
    }

}


export async function getStaticProps() {
    return {
        props: {
            people: await getPeoleFromDirectory()
        }
    }
}