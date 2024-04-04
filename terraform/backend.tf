terraform {
    backend "s3" {
      bucket = "remotebackend"
      key    = "shoppinglistapp/terraform.tfstate"
      region = "us-west-1"
      profile = "jds"
    }
  }
