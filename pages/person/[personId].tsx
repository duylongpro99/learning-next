import path from "path";
import { promises as fs } from "fs";
import { People } from "../people";

export default function Person () {
    return (
        <h2>Hello, this is next app</h2>
    );
}

async function getPeooleFromDirectory() {
    
}

export async function getStaticPaths() {
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
    const people = await Promise.all(_people);
    console.log(people);
    const personIds = people[0].map((person) => {
        return {
            params: {
                personId: person.id.toString()
            }
        }
    })
    console.log(personIds);
    return {
        paths: [...personIds],
        fallback: false
    }

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