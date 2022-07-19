// deno-lint-ignore-file no-explicit-any
import { Context } from 'https://deno.land/x/abc@v1.3.3/mod.ts'

export async function createUser(ctx: Context) {
    const user = await ctx.body
    let _item: {[key: string]: number}
    // add the user to database
    return ctx.json({ user, message: 'User created successfully' }, 200)
}