import { sequelize } from "../config/database.js";
import { User } from "./User.js";
import { SearchHistory } from "./SearchHistory.js";
import { CourierQuote } from "./CourierQuote.js";
import { PreferredDelivery } from "./PreferredDelivery.js";

User.hasMany(SearchHistory, { foreignKey: "userId" });
SearchHistory.belongsTo(User, { foreignKey: "userId" });

User.hasMany(PreferredDelivery, { foreignKey: "userId" });
PreferredDelivery.belongsTo(User, { foreignKey: "userId" });

SearchHistory.hasMany(CourierQuote, { foreignKey: "searchHistoryId" });
CourierQuote.belongsTo(SearchHistory, { foreignKey: "searchHistoryId" });

export { sequelize, User, SearchHistory, CourierQuote, PreferredDelivery };
