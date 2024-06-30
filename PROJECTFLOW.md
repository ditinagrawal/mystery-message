# How to build this fullstack app?

### Step-1 : We have to define models using mongoose for mongoDB

```javascript
// (ts)

// First we create interfaces for schema
export interface Message extends Document {
    content: string;
    createdAt: Date;
}

// Second we have to create schemas
const MessageSchema: Schema<Message> = new Schema({
    content: { type: String, required: true },
    createdAt: { type: Date, required: true, default: Date.now },
});
```

### Step-2 : We have to create schemas for validation using zod

```javascript
// Flow :-
// signUpSchema.ts -> verifySchema.ts -> signInSchema.ts -> acceptMessageSchema.ts -> messageSchema.ts
```
