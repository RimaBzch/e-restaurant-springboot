export class User {
    id!:string;
    name!: string;
    password!: string;
    email!: string;
    role : string[];
    session!: string;
    isAccountNonExpired!: boolean;
	isAccountNonLocked!: boolean;
	isCredentialsNonExpired!: boolean;
	isEnabled!: boolean;
    rememberme!: boolean;
    address!:string;
    tel!:number;

    constructor(name: string,
                password: string,
                email: string,
                role: string[],
                session: string,
                isAccountNonExpired: boolean,
                isAccountNonLocked: boolean,
                isCredentialsNonExpired: boolean,
                isEnabled: boolean,
                rememberme: boolean,
                address:string,
                tel:number,
                id:string
                )
                {
                    this.name  = name,
                    this.password= password,
                    this.email= email,
                    this.role=role,
                    this.session= session,
                    this.isAccountNonExpired= isAccountNonExpired,
                    this.isAccountNonLocked= isAccountNonLocked,
                    this.isCredentialsNonExpired= isCredentialsNonExpired,
                    this.isEnabled= isEnabled,
                    this.rememberme=rememberme,
                    this.address=address,
                    this.tel=tel,
                    this.id=id
                }
}