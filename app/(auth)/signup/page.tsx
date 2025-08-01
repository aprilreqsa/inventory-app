"use client"
import { Button } from "@/components/ui/button"
import { 
    Card, 
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import { useState } from "react"
interface User {
    username: string;
    password: string;
}


export default  function Page() {
    const router = useRouter()
    const [user,setUser] = useState<User>({
        username: "",
        password: ""
    })
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser({
            ...user,
            [e.target.id]: e.target.value
        })
    }
    const handleSubmit = async () => {
        const response = await fetch('/api/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: user.username,
                password: user.password
            })
        });
        if (response.ok) {
            router.push('/signin');
        } else {
            // Handle error
            console.error("Error registering user");
        }
    }
    
    return (
        <Card className="w-full max-w-sm m-auto mt-10">
            <CardHeader>
                <CardTitle>Sign up to our Platform</CardTitle>
                <CardDescription>Enter Your Username below to register your account</CardDescription>
            </CardHeader>
            <CardContent>
                <form action="">
                    <div className="flex flex-col gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="username">Username</Label>
                            <Input 
                            id="username"
                            placeholder="Enter your username"
                            type="text"
                            required
                            value={user.username}
                            onChange={handleChange} 
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">Password</Label>
                            <Input 
                            id="password"
                            placeholder="Enter your password"
                            type="password"
                            required
                            value={user.password}
                            onChange={handleChange}
                            />
                        </div>
                    </div>
                </form>
            </CardContent>
            <CardFooter className="flex flex-col gap-2">
                <Button 
                onClick={handleSubmit}
                type="submit" className="w-full">
                    Register
                </Button>
                <Button 
                    onClick={()=> router.push('/signin')}
                    variant="outline" type="submit" className="w-full" >
                        Login
                </Button> 
            </CardFooter>
        </Card>
    )

}