export interface TeamMember {
    id: number;
    name: string;
    age: number;
    phone: string;
    email: string;
    access: "admin" | "manager" | "user"; 
}