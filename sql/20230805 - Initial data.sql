IF NOT EXISTS(SELECT 1 FROM [to].[Configuration] WHERE Name = 'Encryption key')
BEGIN
	INSERT INTO [to].[Configuration]
           ([Name]
           ,[Value]
           ,[CreatedAt])
     VALUES
           ('Encryption key'
           ,'Education is the key to success.'
           ,GETDATE())
END