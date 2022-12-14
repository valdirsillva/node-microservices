import { Replace } from "src/helpers/Replace";
import { Content } from "./content";
import { randomUUID } from 'node:crypto'

export interface NotificationProps {
    recipientId: string;
    content: Content;
    category: string;
    readAt?: Date | null; // Opcional
    createdAt: Date;
}

export class Notification {
    private _id: string;
    private props: NotificationProps;

    constructor(props: Replace<NotificationProps, { createdAt?: Date }>) {
        this._id = randomUUID();
        this.props = {
            ...props,
            createdAt: props.createdAt ?? new Date()
        }
    }

    public get id() {
        return this._id;
    }

    public set content(content: Content) {
        this.content = content;
    }

    public get content(): Content {
        return this.props.content;
    }

    public set recipientId(recipientId: string) {
        this.recipientId = recipientId;
    }

    public get recipientId(): string {
        return this.props.recipientId;
    }

    public set category(category: string) {
        this.category = category;
    }

    public get category(): string {
        return this.props.category;
    }

    public set readAt(readAt: Date | null | undefined) {
        this.readAt = readAt;
    }

    public get readAt(): Date | null | undefined {
        return this.props.readAt;
    }

    public get createdAt(): Date {
        return this.props.createdAt;
    }



}