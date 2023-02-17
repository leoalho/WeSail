const replacables = ["email"] as const
type Replacable = typeof replacables[number]

type Op = 'add' | 'remove' | 'replace'

interface Patch {
	op: Op,
	path: string,
	value: string
}

const isReplacable = (path: any): path is Replacable => {
	return (replacables as readonly string[]).indexOf(path) >= 0
}

var user = {
    username: "leo",
    email: "leo.leo@leo.leo"
  }

const testPatch: Patch = {op: "replace", path: "/email", value: "uusi.uusi@uusi.uusi"}

const UserJsonPatch = (id: string, patch: Patch) => {
	const parsedPath =  patch.path.split("/")
  if (parsedPath.length === 0){
    return
  }
  const user2 = user 
	switch (patch.op){
		case "add":
			if (Array.isArray(parsedPath[1])){
      			}
			break
		case "remove":
      			if (Array.isArray(parsedPath[1])){
      			}
			break
		case "replace":
			if (parsedPath[1]==="password"){
			}
			if (isReplacable(parsedPath[1])){
				user[parsedPath[1]]= patch.value
			}	
			break
	}
}

console.log(user)
UserJsonPatch("123", testPatch)
console.log( user)