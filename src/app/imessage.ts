export interface IMessage {
     message: string;
     timestamp: string;
     user: string;
     userEmail: string;
     userPhotoUrl: string;
     replies: IMessage[];
     photoURL: string
}
