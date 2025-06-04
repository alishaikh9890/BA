import {
  appwriteUrl,
  appwriteProjectId,
  appwriteDatabaseId,
  appwriteCollectionId,
  appwriteBucketId,
} from "../conf.js";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client.setEndpoint(appwriteUrl).setProject(appwriteProjectId);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      return this.databases.createDocument(
        appwriteDatabaseId,
        appwriteCollectionId,
        slug,
        { title, content, featuredImage, status, userId }
      );
    } catch (error) {
      console.log("appwrite Service :: databases :: " + error);
    }
  }

  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.databases.updateDocument(
        appwriteDatabaseId,
        appwriteCollectionId,
        slug,
        { title, content, featuredImage, status }
      );
    } catch (error) {
      console.log("appwrite service :: updatepost :: " + error);
    }
  }

  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        appwriteDatabaseId,
        appwriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.log("appwrite service :: deletePost :: " + error);
      return false;
    }
  }

  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        appwriteDatabaseId,
        appwriteCollectionId,
        slug
      );
    } catch (error) {
      console.log("appwrite service :: getPost :: " + error);
      return false;
    }
  }

  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        appwriteDatabaseId,
        appwriteCollectionId,
        queries
      );
    } catch (error) {
      console.log("appwrite service :: getPosts :: " + error);
      return false;
    }
  }

  //   file upload servece
  async uploadFile(file) {
    try {
      return await this.bucket.createFile(appwriteBucketId, ID.unique(), file);
    } catch (error) {
      console.log("appwrite survice :: uplodadFile :: " + error);
      return false;
    }
  }

  async deleteFile(fileId){
    try {
        await this.bucket.deleteFile(appwriteBucketId, fileId)
        return true
    } catch (error) {
        console.log("appwrite service :: deleteFile :: " + error) 
        return false
    }
  }

  getfilePreview(fileId){
    return this.bucket.getFilePreview(appwriteBucketId, fileId)
  }

}

const service = new Service();
export default service;
