﻿using System;
using System.Collections.Generic;

namespace bookballAPI.ModelsRender
{
    public partial class UserClaims
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public string ClaimType { get; set; }
        public string ClaimValue { get; set; }

        public virtual Users User { get; set; }
    }
}
