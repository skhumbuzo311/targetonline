IF NOT EXISTS(SELECT 1 FROM sys.schemas WHERE NAME = 'to')
BEGIN
	EXEC ('CREATE SCHEMA [to]')
END

IF OBJECT_ID('to.User', 'U') IS NULL
CREATE TABLE [to].[User]
(
	ID INT IDENTITY(1, 1) NOT NULL,
	FirstName VARCHAR(50) NOT NULL,
	LastName VARCHAR(50) NOT NULL, 
	PhoneNumber VARCHAR(50) NULL, 
	Address VARCHAR(MAX) NULL,
	ExpoPushToken VARCHAR(MAX) NULL,
	EmailAddress VARCHAR(100) NOT NULL,
	IsActive bit NOT NULL DEFAULT 0,
	IsOnline bit NOT NULL DEFAULT 0,
	IsEmailVerified bit NOT NULL DEFAULT 0,
	IsPhoneNumberVerified bit NOT NULL DEFAULT 0,
	IsAdmin bit NOT NULL DEFAULT 0,
	HasAvatar bit NOT NULL DEFAULT 0,
	AvatarURL VARCHAR(MAX) NULL,
	AverageRating INT NOT NULL DEFAULT 0,
	ImageHeight INT NOT NULL DEFAULT 0,
	ImageWidth INT NOT NULL DEFAULT 0,
	Customers INT NOT NULL DEFAULT 0,
	Projects INT NOT NULL DEFAULT 0,
	Income DECIMAL(18, 4) NOT NULL DEFAULT 0,
	Password VARCHAR(MAX) NOT NULL,
	LastLoggedIn DateTime NOT NULL,
	CreatedAt DateTime NOT NULL
	CONSTRAINT PK_User
		PRIMARY KEY (ID)
)

IF OBJECT_ID('to.Configuration', 'U') IS NULL
CREATE TABLE [to].[Configuration]
(
	ID INT IDENTITY(1, 1) NOT NULL,
	Name VARCHAR(MAX) NOT NULL,
	Value VARCHAR(MAX) NOT NULL, 
	CreatedAt DateTime NOT NULL
	CONSTRAINT PK_Configuration
		PRIMARY KEY (ID)
)