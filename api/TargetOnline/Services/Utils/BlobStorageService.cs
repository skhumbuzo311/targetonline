﻿using Microsoft.Extensions.Configuration;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;
//
//using ServiceLayer.AppConfig;
using System;
using System.IO;
using System.Threading.Tasks;

namespace ServiceLayer
{
    public class BlobStorageService
    {
        private string _accessKey = string.Empty;
        private string _environment = string.Empty;

        public BlobStorageService(IConfiguration configuration)
        {
            _environment = configuration.GetSection("Environment").Value;
            _accessKey = configuration.GetConnectionString("StorageAccessKey");
        }

        public string UploadFileToBlob(string strFileName, byte[] fileData, string fileMimeType)
        {
            try
            {

                var _task = Task.Run(() => UploadFileToBlobAsync(strFileName, fileData, fileMimeType));
                _task.Wait();
                string fileUrl = _task.Result;
                return fileUrl;
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }

        public async void DeleteBlobData(string fileUrl)
        {
            Uri uriObj = new Uri(fileUrl);
            string BlobName = Path.GetFileName(uriObj.LocalPath);

            CloudStorageAccount cloudStorageAccount = CloudStorageAccount.Parse(_accessKey);
            CloudBlobClient cloudBlobClient = cloudStorageAccount.CreateCloudBlobClient();
            CloudBlobContainer cloudBlobContainer = cloudBlobClient.GetContainerReference(_environment.ToLower());

            CloudBlobDirectory blobDirectory = cloudBlobContainer.GetDirectoryReference(fileUrl.Split('/')[fileUrl.Split('/').Length - 2]);
            // get block blob refarence    
            CloudBlockBlob blockBlob = blobDirectory.GetBlockBlobReference(BlobName);

            // delete blob from container        
            await blockBlob.DeleteAsync();
        }


        private string GenerateFileName(string fileName)
        {
            string strFileName = string.Empty;
            string[] strName = fileName.Split('.');
            strFileName = DateTime.Now.ToUniversalTime().ToString("yyyy-MM-dd") + "/" + DateTime.Now.ToUniversalTime().ToString("yyyyMMdd\\THHmmssfff") + "." + strName[strName.Length - 1];
            return strFileName;
        }

        private async Task<string> UploadFileToBlobAsync(string strFileName, byte[] fileData, string fileMimeType)
        {
            try
            {
                CloudStorageAccount cloudStorageAccount = CloudStorageAccount.Parse(_accessKey);
                CloudBlobClient cloudBlobClient = cloudStorageAccount.CreateCloudBlobClient();
                CloudBlobContainer cloudBlobContainer = cloudBlobClient.GetContainerReference(_environment.ToLower());
                string fileName = this.GenerateFileName(strFileName);

                if (await cloudBlobContainer.CreateIfNotExistsAsync())
                {
                    await cloudBlobContainer.SetPermissionsAsync(new BlobContainerPermissions { PublicAccess = BlobContainerPublicAccessType.Blob });
                }

                if (strFileName != null && fileData != null)
                {
                    CloudBlockBlob cloudBlockBlob = cloudBlobContainer.GetBlockBlobReference(strFileName);
                    cloudBlockBlob.Properties.ContentType = fileMimeType;
                    await cloudBlockBlob.UploadFromByteArrayAsync(fileData, 0, fileData.Length);
                    return cloudBlockBlob.Uri.AbsoluteUri;
                }
                return "";
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }
    }
}